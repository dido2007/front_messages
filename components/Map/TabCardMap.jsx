'use client'
import { useState } from 'react';
import MapDemande from '@components/Map/MapDemande';
import MapOffre from '@components/Map/MapOffre';
import Searchbar from '@components/Marketplace/Searchbar';

function TabCardMap() {
  const [activeTab, setActiveTab] = useState('offres');

    return (
      <>
      <div className="card w-96 bg-base-100 w-full">
          <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl">Marketplace</h2>
                <br />
                <Searchbar />
                <br />
                <div className="tabs tabs-boxed">
                    <button onClick={(e) => setActiveTab(e.target.value)} value="offres" className={`tab ${ activeTab === 'offres' ? 'tab-active' : ''}`}>Offres</button> 
                    <button onClick={(e) => setActiveTab(e.target.value)} value="demandes" className={`tab ${ activeTab === 'demandes' ? 'tab-active' : ''}`}>Demandes</button> 
                </div>
                <br /><br />
                <div className={`${ activeTab === 'offres' ? '' : 'hidden' }`}>
                    <MapOffre load={activeTab === 'offres' ?  true : false} />
                </div>
                <div className={`${ activeTab === 'demandes' ? '' : 'hidden' }`}>
                    <MapDemande load={activeTab === 'demandes' ?  true : false} />
                </div>
            </div>
        </div>`
      </>
    );
}
  
export default TabCardMap;