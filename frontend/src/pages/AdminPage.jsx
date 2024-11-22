import React, { useContext, useState } from 'react'
import './AdminPage.css'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'

const AdminPage = () => {
    const[selected,setSelected]=useState(1);
    const {userRole,vrste_obroka,token} = useContext(StoreContext)
    const [responseText,setResponseText] =useState("")
    const [id, setId] = useState("");
    const [naziv, setNaziv] = useState("");
    const [opis, setOpis] = useState("");
    const [vreme, setVreme] = useState(1);
    const [nacinPripreme, setNacinPripreme] = useState("");
    const [porcija, setPorcija] = useState(1);
    const [vrstaObroka, setVrstaObroka] = useState("");
    const [kategorijaId, setKategorijaId] = useState(1);
    const [kuhinjaId, setKuhinjaId] = useState(1);
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0]; 
        console.log("Selected file:", file);
        if (file) {
          setImage(file);
        }
      };

    function handleClick(event){
        event.preventDefault();
        if(selected===1 && naziv!==""){
            updateKuhinje()
        } else if(selected===2 && naziv!=="" && opis!=="" && nacinPripreme!=="" && vrstaObroka!==""){
            addRecept()
        }  else if(selected===3 && naziv!=="" && opis!=="" && nacinPripreme!=="" && vrstaObroka!==""){
            updateRecept()
        }  else if(selected===4 && id!==""){
            deleteRecept()
        }
        else{
            setResponseText("Polja ne smeju biti prazna")
        }
    }

    function updateKuhinje(){

        const data = {
            id: id,
            naziv: naziv
        };
        
        let config = {
            method: 'put',
            url: `http://127.0.0.1:8000/api/kuhinje/${id}`,
            headers: { 
              Authorization: `Bearer ${token}`
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setId(1)
            setNaziv('')
            setResponseText("Kuhinja je uspesno azurirana.")
          })
          .catch((error) => {
            console.log(error);
            setResponseText("Doslo je do greske. Pokusajte ponovo")
          });
    }

    function addRecept(){
        const formData = new FormData();
        formData.append("naziv", naziv);
        formData.append("opis", opis);
        formData.append("vreme_pripreme", vreme);
        formData.append("broj_porcija", porcija);
        formData.append("nacin_pripreme", nacinPripreme);
        formData.append("vrsta_obroka", vrstaObroka);
        formData.append("kategorija_id", kategorijaId);
        formData.append("kuhinja_id", kuhinjaId);

        if (image) {
            formData.append("slika", image); 
        }
        let config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/recepti',
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
            data : formData
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setNaziv("")
            setOpis("")
            setVreme(1)
            setPorcija(1)
            setNacinPripreme("")
            setVrstaObroka("")
            setKategorijaId(1)
            setKuhinjaId(1)
            setImage(null)
            setResponseText("Recept je uspesno dodat.")
          })
          .catch((error) => {
            console.log(error);
            setResponseText("Doslo je do greske, pokusajte ponovo.")
          });
    }

    function updateRecept() {
        const data = {
            naziv: naziv,
            opis: opis,
            vreme_pripreme: vreme,
            broj_porcija: porcija,
            nacin_pripreme: nacinPripreme,
            vrsta_obroka: vrstaObroka,
            kategorija_id: kategorijaId,
            kuhinja_id: kuhinjaId
        }
        let config = {
            method: 'put',
            url: `http://127.0.0.1:8000/api/recepti/${id}`,
            headers: { 
              Authorization: `Bearer ${token}`
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setId(1) 
            setNaziv("")
            setOpis("")
            setVreme(1)
            setPorcija(1)
            setNacinPripreme("")
            setVrstaObroka("")
            setKategorijaId(1)
            setKuhinjaId(1)
            setResponseText("Recept je azauriran.")
          })
          .catch((error) => {
            console.log(error);
            setResponseText("Doslo je do greske, pokusajte ponovo.")
          });
    }

    function deleteRecept(){
        let config = {
            method: 'delete',
            url: `http://127.0.0.1:8000/api/recepti/${id}`,
            headers: {  
              Authorization: `Bearer ${token}`
            },
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setId(0)
            setResponseText("Recept je obrisan")
          })
          .catch((error) => {
            console.log(error);
            setResponseText("Doslo je do greske. Pokusajte ponovo")
          });
    }

    // if(userRole!=='admin'){
    //     return <p>Ne mozete pristupiti ovoj stranici</p>
    // }

  return (
    <div className="admin-panel-page">
        <h1>Admin panel</h1>
        <div className="admin-panel">
            <div className="admin-nav">
                <button onClick={()=>setSelected(1)} className={selected === 1 ? 'btn-active' : ''}>Azuriraj kuhinju</button>
                <button onClick={()=>setSelected(2)} className={selected === 2 ? 'btn-active' : ''}>Dodaj recept</button>
                <button onClick={()=>setSelected(3)} className={selected === 3 ? 'btn-active' : ''}>Azuriraj recept</button>
                <button onClick={()=>setSelected(4)} className={selected === 4 ? 'btn-active' : ''}>Obrisi recept</button>
            </div>
            <div className="admin-panel-form">
                <div className="admin-panel-form-container">
                    {
                        selected===1 && (
                            <div className="admin-panel-form">
                                <form onSubmit={handleClick}>
                                    <div className="label-input-group">
                                        <label htmlFor="kuhinja-id">Kuhinja ID: </label>
                                        <input type="number" min={1} className='number-input' id='kuhinja-id'  value={id} 
                                            onChange={(e) => setId(e.target.value)}/>
                                    </div>
                                    <div className="label-input-group">
                                        <label htmlFor="kuhinja-naziv">Naziv: </label>
                                        <input type="text" className='cmb-input' id='kuhinja-naziv'  value={naziv} 
                                            onChange={(e) => setNaziv(e.target.value)}/>
                                    </div>
                                        <input className='admin-form-submit' type="submit" value="Posalji"></input>                                        
                                </form>
                            </div>
                        )
                    }
                    {
                        (selected===2 || selected===3) && (
                            <div className="admin-panel-form">
                                <form onSubmit={handleClick}>
                                    {selected===3 && (
                                        <div className="label-input-group">
                                            <label htmlFor="recept-id">Recept ID: </label>
                                            <input type="number" min={1} className='number-input' id='recept-id'  value={id} 
                                             onChange={(e) => setId(e.target.value)}/>
                                        </div>
                                    )}
                                    <div className="label-input-group">
                                        <label htmlFor="recept-dodaj-naziv">Naziv: </label>
                                        <input type="text" className='text-input' id='recept-dodaj-naziv' value={naziv}
                                            onChange={(e) => setNaziv(e.target.value)} />
                                    </div>
                                    <div className="label-input-group">
                                        <label htmlFor="recept-dodaj-opis">Opis: </label>
                                        <input type="text" className='text-input' id='recept-dodaj-opis' value={opis}
                                            onChange={(e) => setOpis(e.target.value)}/>                                        
                                    </div>
                                    <div className="label-input-group">
                                        <label htmlFor="recept-dodaj-vreme">Vreme pripreme: </label>
                                        <input type="number" min={1} className='number-input' id='recept-dodaj-vreme' value={vreme}
                                             onChange={(e) => setVreme(e.target.value)} />
                                        <label htmlFor="recept-dodaj-porcije">Broj porcija: </label>
                                        <input type="number" min={1} className='number-input' id='recept-dodaj-porcije' value={porcija}
                                            onChange={(e) => setPorcija(e.target.value)} />
                                    </div>
                                    <div className="label-input-group">
                                        <label htmlFor="recept-dodaj-nacin">Nacin pripreme: </label>
                                        <input type="text" className='text-input' id='recept-dodaj-nacin' value={nacinPripreme}
                                            onChange={(e) => setNacinPripreme(e.target.value)} />
                                    </div>
                                    <div className='label-input-group'>
                                        <label htmlFor="recept-dodaj-obrok">Izaberite vrstu obroka:</label>
                                        <input list="options" id="recept-dodaj-obrok" className="cmb-input" value={vrstaObroka}
                                            onChange={(e) => setVrstaObroka(e.target.value)}/>
                                        <datalist id="options">
                                            {vrste_obroka.map((obrok) => (
                                            <option key={obrok.name} value={obrok.name} />
                                            ))}
                                        </datalist>
                                    </div>
                                    <div className="label-input-group form-group-numeric-container">
                                        <div className="label-input-group">
                                            <label htmlFor="recept-dodaj-kategorija">Kategorija: </label>
                                            <input type="number" min={1} className='number-input' id='recept-dodaj-kategorija'value={kategorijaId}
                                                onChange={(e) => setKategorijaId(e.target.value)} />
                                        </div>
                                        <div className="label-input-group">
                                            <label htmlFor="recept-dodaj-kuhinja">Kuhinja: </label>
                                            <input type="number" min={1} className='number-input' id='recept-dodaj-kuhinja' value={kuhinjaId}
                                                onChange={(e) => setKuhinjaId(e.target.value)} />
                                        </div>
                                    </div>
                                    {selected===2 && (<div className="label-input-group">
                                        <label htmlFor="recept-dodaj-sliku">Slika recepta: </label>
                                        <input className='recept-file'
                                            type="file" 
                                            id="recept-dodaj-sliku" 
                                            onChange={handleImageChange} 
                                        />
                                    </div>)}
                                    <input className='admin-form-submit'type="submit" value="Posalji" ></input>
                                </form>
                            </div>
                        )
                    }
                    {
                        selected===4 && (
                            <div className="admin-panel-form">
                                <form onSubmit={handleClick}>
                                    <div className="label-input-group">
                                        <label htmlFor="recept-obrisi-id">Recept ID: </label>
                                        <input type="number" min={1} className='number-input' id='recept-obrisi-id' value={id} 
                                            onChange={(e) => setId(e.target.value)}/>
                                    </div>
                                    <input className='admin-form-submit' type="submit" value="Posalji"></input>
                                </form>
                            </div>
                        )
                    }
                </div>
                <p>{responseText}</p>
            </div>
        </div>
    </div>
  )
}

export default AdminPage