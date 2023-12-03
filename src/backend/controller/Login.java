package backend.controller;

import backend.model.Usuario;
import backend.model.UsuarioDAO;

public class Login {
    public static Usuario buscarUsuario(String email, String senha) {
        UsuarioDAO dao = new UsuarioDAO();
        Usuario usuario = new Usuario();

        usuario = dao.buscarUsuarioPorEmailSenha(email, senha);

        if(usuario != null){
            return usuario;
        } else {
            return null;
        }
    }
}
