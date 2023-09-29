// Function to add menu items to the sidebar
function addMenuItem(text, link) {
  const ul = document.getElementById("sidebarMenuTemplate");
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = link;
  a.textContent = text;
  li.appendChild(a);
  ul.appendChild(li);
}

// Add menu items
addMenuItem("Dashboard", "../dashboard.html");
addMenuItem("Profile", "../profile.html");
addMenuItem("Settings", "../settings.html");
