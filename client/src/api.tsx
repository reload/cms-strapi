export function getApiUrl() {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:1337`;
  } else {
    return `https://www.api.${window.location.host.replace("www.", "")}`;
  }
}

export function getApiToken() {
  if (process.env.NODE_ENV === "development") {
    return `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjEyMjc4ODI2LCJleHAiOjE2MTQ4NzA4MjZ9.WMPFKUGYMR6QER-voz7WG1sAs-t8yO-09WQtLwJAQY0`;
  } else {
    return `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE0MzQwMDA0LCJleHAiOjE2MTY5MzIwMDR9.nnp2XTZ9u4XWCaI5WH7uugopwn6ed4cZn4wDOHqdf-E`;
  }
}
