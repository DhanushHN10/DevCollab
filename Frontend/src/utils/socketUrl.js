export function buildSocketUrl() {
  const baseUrl =
    import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE_URL || "";

  return baseUrl.replace(/\/api\/?$/, "");
}
