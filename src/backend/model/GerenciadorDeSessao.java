package backend.model;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class GerenciadorDeSessao {
    private static final Map<String, String> usuariosLogados = new HashMap<>();

    public static String iniciarSessao(String usuario) {
        String token = UUID.randomUUID().toString();
        usuariosLogados.put(token, usuario);
        return token;
    }

    public static boolean verificarSessao(String token) {
        return usuariosLogados.containsKey(token);
    }

    public static void encerrarSessao(String token) {
        usuariosLogados.remove(token);
    }

    public static String getEmailToken(String token){
        return usuariosLogados.get(token);
    }

    public static String getNomeToken(String token){
        String email = getEmailToken(token);
        UsuarioDAO dao = new UsuarioDAO();
        String nome = dao.buscarUsuarioPorEmail(email).getNome();
        return nome;
    }

    public static String getCpfToken(String token){
        String email = getEmailToken(token);
        UsuarioDAO dao = new UsuarioDAO();
        String cpf = dao.buscarUsuarioPorEmail(email).getCpf();
        return cpf;
    }
}
