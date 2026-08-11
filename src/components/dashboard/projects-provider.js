"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { projectsApi, toFormData } from "@/lib/api-client";

const ProjectsContext = createContext(null);

// Fields the API stores as uploaded assets rather than plain values.
const FILE_KEYS = ["image", "projectRequirements"];

/**
 * Splits a form payload into plain fields plus any File objects, and returns
 * a FormData body when there's something to upload.
 */
function buildBody(data, files = {}) {
  const payload = {};

  for (const [key, value] of Object.entries(data)) {
    // A file field holds a preview object, not a value the API can store.
    if (FILE_KEYS.includes(key)) continue;
    if (value === undefined || value === null) continue;
    payload[key] = value;
  }

  const uploads = FILE_KEYS.filter((key) => files[key]);
  if (!uploads.length) return payload;

  return toFormData({
    ...payload,
    ...Object.fromEntries(uploads.map((key) => [key, files[key]])),
  });
}

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      try {
        const { projects: list } = await projectsApi.list();
        if (!active) return;
        setProjects(list);
        setError(null);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProjects();
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const refresh = useCallback(() => {
    setLoading(true);
    setReloadKey((k) => k + 1);
  }, []);

  const addProject = useCallback(async (data, files) => {
    const { project } = await projectsApi.create(buildBody(data, files));
    setProjects((prev) => [project, ...prev]);
    return project;
  }, []);

  const updateProject = useCallback(async (id, data, files) => {
    const { project } = await projectsApi.update(id, buildBody(data, files));
    setProjects((prev) => prev.map((p) => (p._id === id ? project : p)));
    return project;
  }, []);

  const removeProject = useCallback(async (id) => {
    await projectsApi.remove(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        error,
        refresh,
        addProject,
        updateProject,
        removeProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }
  return ctx;
}
