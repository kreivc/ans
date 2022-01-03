import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Ask from "./pages/Ask";
import DetailQuestion from "./pages/DetailQuestion";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import SearchResult from "./pages/SearchResult";
import Tag from "./pages/Tag";

const App = () => {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search/result" element={<SearchResult />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/question/:id" element={<DetailQuestion />} />
          <Route path="/tag/:id" element={<Tag />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
