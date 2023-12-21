import EditCityForm from "@/components/EditCityForm";

const getCityById = async( id ) => {
    try {
        const res = await fetch(`http://localhost:3000/api/cities/${id}`, {
            cache: "no-store",
        });
        if(!res.ok) {
            throw new Error("Failed to fetch topic") ;
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export default async function EditCity( { params }) {

    const { id } = params;
    const  city  = await getCityById( id );

    return (
        <EditCityForm id={id} city={city} />
    )
}