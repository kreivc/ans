import React, { useEffect, useState } from "react";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const useDocumentTitle = (title: string) => {
  const [document_title, setDoucmentTitle] = useState(title);
  useEffect(() => {
    document.title = document_title;
  }, [document_title]);

  return [document_title, setDoucmentTitle];
};

// const [document_title, setDoucmentTitle] = useDocumentTitle("Home page");

export const validateForm = (title: string, body: string, tags: string[]) => {
  if (title === "") {
    return {
      title: "Title cannot be null!",
      description: "Add Title..",
      status: "error",
    };
  } else if (body === "") {
    return {
      title: "Body cannot be null!",
      description: "Add body..",
      status: "error",
    };
  } else if (tags.length === 0) {
    return {
      title: "Tags cannot be null!",
      description: "Add tags..",
      status: "error",
    };
  } else {
    return {
      title: "Success post a question!",
      description: "let's see your question..",
      status: "success",
    };
  }
};
