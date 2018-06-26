[...document.querySelectorAll('head > link')].filter((link) => link.type === "application/rss+xml" || link.type === "application/atom+xml").forEach((link) => alert(link.href));
