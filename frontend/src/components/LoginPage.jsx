import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LoginPage = ({addToken}) => {    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    let navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault(); //izbegavam refresh stranice
      const data = {
        email: email,
        password: password
    };
      axios.post("/api/login",data)
      .then((response)=> {
        console.log(response.data);
        if(response.data.success==true){
            window.sessionStorage.setItem("auth_token",response.data.access_token);
        }
        addToken(response.data.access_token);
        navigate("/");
      })
      .catch((error)=>{
        console.log(error);
      });
      console.log("Email:", email);
      console.log("Password:", password);
    };
    return (
        <section className="vh-100 gradient-custom" style={{ backgroundColor: "#6a11cb" }}>
         <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{ borderRadius: 1+"rem" }}>
                <div className="card-body p-5 text-center">
                  <form onSubmit={handleSubmit}>
  
                     <div className="mb-md-5 mt-md-4 pb-5">
                        <h2 className="fw-bold mb-2 text-uppercase">Prijavite se</h2>
                        <p className="text-white-50 mb-5">Unesite Vaš imejl i šifru naloga.</p>
    
                        <div className="form-outline form-white mb-4">
                        <input type="email" id="typeEmailX" className="form-control form-control-lg" value={email} 
                          onChange={(e) => setEmail(e.target.value)} required/>
                        <label className="form-label label-custom" htmlFor="typeEmailX">Imejl</label>
                        </div>
    
                        <div className="form-outline form-white mb-4">
                        <input type="password" id="typePasswordX" className="form-control form-control-lg" value={password}
                            onChange={(e) => setPassword(e.target.value)} required/>
                        <label className="form-label label-custom" htmlFor="typePasswordX">Šifra</label>
                        </div>
    
                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Prijavite se!</button>
    
                        <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                        <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                        <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                        </div>
                     </div>
                  </form>
    
                     <div>
                            <p className="mb-0">
                            Nemate nalog? <a href="/register" className="text-white-50 fw-bold">Registrujte se</a>
                            </p>
                     </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default LoginPage