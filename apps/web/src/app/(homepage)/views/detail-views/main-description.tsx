import * as React from "react";


interface IMainDescriptionProps {
  data:{
    description:string
  }
}

const MainDescription: React.FunctionComponent<IMainDescriptionProps> = (props) => {
  return (
    <section>
      <div className="mx-[0px] h-[300] w-full rounded-lg bg-white p-[20px] md:mx-[120px] md:mt-[10px] md:w-[784px]  md:px-[28px] md:py-[28px]">
        <div className=" ">
          <h1 className="text-[18px]  font-semibold ">Deskripsi</h1>
          <p className="mt-[12px] text-justify text-[14px] md:mt-[10px] md:text-[14px]">
            {props.data.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainDescription;
