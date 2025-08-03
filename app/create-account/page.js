// app/page.js
import Navbar from "@/components/NavbarHome";
import FormCard from "@/components/FormCard";
import CreateAccount from "@/components/CreateAccount";

export default function Page() {
    return (
        <>
            <Navbar />
            <FormCard>
            <CreateAccount />
            </FormCard>
        </>
    );
}
