package backend.controller;

import backend.model.Usuario;
import backend.model.UsuarioDAO;

public class Cadastro {
    public static boolean cadastrarUsuario(String nome, String cpf, String email, String senha, String tipo, String cidade, String genero) {
        UsuarioDAO dao = new UsuarioDAO();
        Usuario usuario = new Usuario();

        usuario.setNome(nome);
        usuario.setCpf(cpf);
        usuario.setEmail(email);
        usuario.setSenha(senha);
        usuario.setTipo(tipo);
        usuario.setCidade(cidade);
        usuario.setGenero(genero);

        if(dao.inserirUsuario(usuario)) {
            System.out.println("Usuário inserido");
            return true;
        } else {
            System.out.println("Usuário não inserido");
            return false;
        }
    }
}