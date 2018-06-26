[...document.querySelectorAll('head > link')].filter((link) => link.type === "application/rss+xml").forEach((link) => alert(link.href));
