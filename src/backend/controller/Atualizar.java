package backend.controller;

import backend.model.Usuario;
import backend.model.UsuarioDAO;

public class Atualizar {
    public static boolean atualizarUsuario(String nome, String email, String novoEmail, String senha, String novaSenha, String tipo, String cidade, String genero) {
        UsuarioDAO dao = new UsuarioDAO();
        Usuario usuario = new Usuario();

        usuario.setNome(nome);
        usuario.setEmail(novoEmail);
        usuario.setSenha(novaSenha);
        usuario.setTipo(tipo);
        usuario.setCidade(cidade);
        usuario.setGenero(genero);

        if(dao.alterarUsuario(usuario, email, senha)) {
            System.out.println("Usuário inserido");
            return true;
        } else {
            System.out.println("Usuário não inserido");
            return false;
        }
    }
}