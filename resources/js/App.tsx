import { createStandaloneToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchResult from "./pages/SearchResult";
// import { useAppSelector } from "./store/hooks";
// import { isLoading } from "./store/LoadingSlice";

const App = () => {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);
  //   const loading = useAppSelector(isLoading);
  //   const toast = createStandaloneToast();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search/result" element={<SearchResult />} />
        </Routes>
        {/* {loading &&
          toast({
            title: loading.title,
            description: loading.description,
            status: loading.status,
            duration: 5000,
            isClosable: true,
          })} */}
      </Layout>
    </BrowserRouter>
  );
};

export default App;
