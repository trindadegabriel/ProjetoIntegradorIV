package backend.model;

import backend.bd.GerenciadorDeConexao;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.conversions.Bson;

public class UsuarioDAO {
    private MongoDatabase database;

    public UsuarioDAO(){
        this.database = GerenciadorDeConexao.conectar();
    }

    public boolean inserirUsuario(Usuario usuario){
        boolean usuarioJaExiste = buscarUsuarioPorCPFouEmail(usuario.getCpf(), usuario.getEmail());
        if(usuarioJaExiste){
            return false;
        }

        Document documento = new Document()
            .append("nome", usuario.getNome())
            .append("cpf", usuario.getCpf())
            .append("email", usuario.getEmail())
            .append("senha", usuario.getSenha())
            .append("tipo-sanguineo", usuario.getTipo())
            .append("cidade", usuario.getCidade())
            .append("genero", usuario.getGenero());

        InsertOneResult resultado = database.getCollection("usuarios").insertOne(documento);
        return resultado.wasAcknowledged();
    }

    public boolean alterarUsuario(Usuario usuario, String email, String senha){
        Usuario usuarioAntigo = buscarUsuarioPorEmailSenha(email, senha);
        if(usuarioAntigo == null){
            return false;
        }
        Bson filtro = Filters.eq("cpf", usuarioAntigo.getCpf());
        Document novoUsuario = new Document("$set", new Document("nome",  usuario.getNome())
                                                             .append("email", usuario.getEmail())
                                                             .append("senha", usuario.getSenha())
                                                             .append("tipo-sanguineo", usuario.getTipo())
                                                             .append("cidade", usuario.getCidade())
                                                             .append("genero", usuario.getGenero()));

        UpdateResult resultado = database.getCollection("usuarios").updateOne(filtro, novoUsuario);

        if(resultado.getModifiedCount() > 0) {
            return true;
        } else {
            return false;
        }
    }

    public void removerUsuario(Usuario usuario){
        Bson filtro = Filters.eq("cpf", usuario.getCpf());
        DeleteResult resultado = database.getCollection("usuarios").deleteOne(filtro);

        if (resultado.getDeletedCount() > 0) {
            System.out.println("Usuário removido\n");
        } else {
            System.out.println("Nenhum usuário encontrado\n");
        }
    }

    public Usuario buscarUsuarioPorEmailSenha(String email, String senha) {
        Bson filtro = Filters.and(
            Filters.eq("email", email),
            Filters.eq("senha", senha)
        );
    
        Document resultado = database.getCollection("usuarios").find(filtro).first();
    
        if(resultado != null) {
            System.out.println("Usuário encontrado\n");
            Usuario usuarioEncontrado = new Usuario();
            usuarioEncontrado.setNome(resultado.getString("nome"));
            usuarioEncontrado.setCpf(resultado.getString("cpf"));
            usuarioEncontrado.setEmail(resultado.getString("email"));
            usuarioEncontrado.setSenha(resultado.getString("senha"));
    
            return usuarioEncontrado;
        } else {
            System.out.println("Usuário não encontrado\n");
            return null;
        }
    }

    public boolean buscarUsuarioPorCPFouEmail(String cpf, String email){
        Bson filtro = Filters.or(
            Filters.eq("cpf", cpf),
            Filters.eq("email", email)
        );

        Document resultado = database.getCollection("usuarios").find(filtro).first();

        // se achar um usuario retorna true, se não retorna falso
        return resultado != null;
    }

    public Usuario buscarUsuarioPorEmail(String email){
        Bson filtro = Filters.eq("email", email);

        Document resultado = database.getCollection("usuarios").find(filtro).first();
    
        if(resultado != null) {
            System.out.println("Usuário encontrado\n");
            Usuario usuarioEncontrado = new Usuario();
            usuarioEncontrado.setNome(resultado.getString("nome"));
            usuarioEncontrado.setCpf(resultado.getString("cpf"));
            usuarioEncontrado.setEmail(resultado.getString("email"));
            usuarioEncontrado.setSenha(resultado.getString("senha"));
            usuarioEncontrado.setTipo(resultado.getString("tipo-sanguineo"));
            usuarioEncontrado.setCidade(resultado.getString("cidade"));
            usuarioEncontrado.setGenero(resultado.getString("genero"));
    
            return usuarioEncontrado;
        } else {
            System.out.println("Usuário não encontrado\n");
            return null;
        }
    }
}