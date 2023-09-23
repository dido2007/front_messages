'use client'
import { useState, useEffect } from "react";
import AnnoncesOffresCard from "./AnnoncesOffresCard";
import { getOffres } from "@hooks/Marketplace/get-annonces";
function OffresGrid() {
  const [offres, setOffres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
            const offresResponse = await getOffres(false);

            if (offresResponse.success) {
                setOffres(offresResponse.data);
            } else {
                console.error("Erreur lors du get des demandes.");
            }
        };

        fetchData();
    }, []);
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offres.map((offre, index) => (
              <AnnoncesOffresCard key={index} annonce={offre}/>
            ))}
        </div>
      </>
    );
}
  
export default OffresGrid;