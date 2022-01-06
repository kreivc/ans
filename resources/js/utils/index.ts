import React, { useEffect, useState } from "react";

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

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

export const validateLogin = (email: string, passowrd: string) => {
  if (email === "") {
    return {
      title: "Email cannot be null!",
      description: "Add Email..",
      status: "error",
    };
  } else if (!validateEmail(email)) {
    return {
      title: "Wrong Email format!",
      description: "Fix your email format..",
      status: "error",
    };
  } else if (passowrd === "") {
    return {
      title: "Password cannot be null!",
      description: "Add Password..",
      status: "error",
    };
  } else if (passowrd.length < 6) {
    return {
      title: "Wrong Password format!",
      description: "Password must be at least 6 characters..",
      status: "error",
    };
  } else {
    return {
      title: "Success login!",
      description: "Start Exploring questions..",
      status: "success",
    };
  }
};

export const validateRegister = (
  name: string,
  email: string,
  passowrd: string,
  confirmPassword: string
) => {
  if (name === "") {
    return {
      title: "Name cannot be null!",
      description: "Add Name..",
      status: "error",
    };
  } else if (name.length < 3) {
    return {
      title: "Name must be at least 3 characters!",
      description: "Fix your name format..",
      status: "error",
    };
  } else if (email === "") {
    return {
      title: "Email cannot be null!",
      description: "Add Email..",
      status: "error",
    };
  } else if (!validateEmail(email)) {
    return {
      title: "Wrong Email format!",
      description: "Fix your email format..",
      status: "error",
    };
  } else if (passowrd === "") {
    return {
      title: "Password cannot be null!",
      description: "Add Password..",
      status: "error",
    };
  } else if (passowrd.length < 6) {
    return {
      title: "Wrong Password format!",
      description: "Password must be at least 6 characters..",
      status: "error",
    };
  } else if (passowrd !== confirmPassword) {
    return {
      title: "Password and Confirm Password must be same!",
      description: "Fix your password format..",
      status: "error",
    };
  } else {
    return {
      title: "Success login!",
      description: "Start Exploring questions..",
      status: "success",
    };
  }
};
