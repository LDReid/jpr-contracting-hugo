// Initialize Netlify Identity
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

// Redirect to admin page after successful login
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("login", () => {
    if (document.location.pathname !== "/admin/") {
      document.location.href = "/admin/";
    }
  });
} 