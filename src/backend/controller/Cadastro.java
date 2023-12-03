package backend.controller;

import backend.model.Usuario;
import backend.model.UsuarioDAO;

public class Cadastro {
    public static void cadastrarUsuario(String nome, String cpf, String email, String senha) {
        UsuarioDAO dao = new UsuarioDAO();
        Usuario usuario = new Usuario();

        usuario.setNome(nome);
        usuario.setCpf(cpf);
        usuario.setEmail(email);
        usuario.setSenha(senha);

        if(dao.inserirUsuario(usuario)) {
            System.out.println("Usuário inserido");
        } else {
            System.out.println("Usuário não inserido");
        }
    }
}