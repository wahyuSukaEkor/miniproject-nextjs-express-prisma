import { Button } from "@/components/ui/button";
import * as React from "react";
import MyEventList from "../views/my-event-list";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <section>
      <MyEventList/>
    </section>
  );
};

export default App;