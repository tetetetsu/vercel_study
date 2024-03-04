import Style from "@/app/components/title/pageTitle.module.scss";

const PageTitle = (props:{
  children: string | React.ReactNode,
}) => {
  const {children} = props;
  return (
    <h1 className={Style.title}>{children}</h1>
  )
}

export default PageTitle