"use client";
import React, { useEffect } from "react";
import Cookie from "js-cookie";
import { keepLogin } from "@/data/auth";

type Props = {
  children: React.ReactNode;
};
const DashboardTemplate: React.FC<Props> = (props) => {
  const { children } = props;

  useEffect(() => {
    const token = Cookie.get("admin-tkn");
    if (!token) return;
    const getData = async () => {
      const res = await keepLogin(token);
      Cookie.set("admin-tkn", res.result.token);
    };

    getData();
  }, []);

  return <>{children}</>;
};

export default DashboardTemplate;
