import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";
import PageHeader from "./PageHeader";

export default function Donate() {
  return (
    <div>
      <Header />
      <PageHeader title="Donate" backgroundColor={style.colors.BLUE_98}/>
      <Section
        height={400}
        backgroundColor={style.colors.BLUE_PRIMARY}
        title="Donate online"
      />
      <Section height={400} title="Donate by check" />
      <Footer />
    </div>
  );
}
