import React, { useEffect, useState } from "react";

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const useDocumentTitle = (title: string) => {
  const [document_title, setDoucmentTitle] = useState(title);
  useEffect(() => {
    document.title = document_title;
  }, [document_title]);

  return [document_title, setDoucmentTitle];
};

export { useDocumentTitle };

// const [document_title, setDoucmentTitle] = useDocumentTitle("Home page");
