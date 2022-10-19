
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks/';
import './LoginPage.css';



const loginFormFields = {
    loginEmail:'',
    loginPassword:''
}

const registerFormFields = {
    registerName:'',
    registerEmail:'',
    registerPassword:'',
    registerPassword2:''

}



export const LoginPage = () => {

    const {startLogin, startRegister, errorMessage} = useAuthStore();

    const {
        loginEmail, 
        loginPassword, 
        onInputChange:onLoginInputChange
    } = useForm(loginFormFields);

    const {
        registerName,
        registerEmail, 
        registerPassword, 
        registerPassword2,
        onInputChange:onRegisterInputChange
    } = useForm(registerFormFields);

    const loginSubmit = (e) => {
        e.preventDefault();
        startLogin({email:loginEmail, password:loginPassword});
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        if(registerPassword !== registerPassword2){
            Swal.fire('Error en el registro', 'Contraseñas no matchean','error');
            return;
        }
        startRegister({name:registerName, email:registerEmail, password:registerPassword});
    }

    useEffect(() => {
      if(errorMessage !== undefined) {
        Swal.fire('Error en la autenticación', errorMessage, 'error');
      }
    
      
    }, [errorMessage])
    



    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}