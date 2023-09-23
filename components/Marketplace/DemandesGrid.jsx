'use client'
import { useState, useEffect } from "react";
import AnnoncesDemandesCard from "./AnnoncesDemandesCard";
import { getDemandes } from '@hooks/Marketplace/get-annonces';

function DemandesGrid() {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          const demandesResponse = await getDemandes(false);

          if (demandesResponse.success) {
              setDemandes(demandesResponse.data);
          } else {
              console.error("Erreur lors du get des demandes.");
          }
      };

      fetchData();
  }, []);

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {demandes.map((demande, index) => (
              <AnnoncesDemandesCard key={index} annonce={demande} />
            ))}
        </div>
      </>
    );
}
  
export default DemandesGrid;