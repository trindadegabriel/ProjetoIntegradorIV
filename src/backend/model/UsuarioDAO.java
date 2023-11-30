package backend.model;

import backend.bd.GerenciadorDeConexao;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.bson.conversions.Bson;

public class UsuarioDAO {
    private MongoDatabase database;
    private MongoCollection<Document> colecaoUsuario;

    public UsuarioDAO(){
        this.database = GerenciadorDeConexao.conectar();
        this.colecaoUsuario = database.getCollection("usuario");
    }

    public void inserirUsuario(Usuario usuario){
        Document documento = new Document("nome",  usuario.getNome())
                                  .append("cpf",   usuario.getCpf())
                                  .append("email", usuario.getEmail())
                                  .append("senha", usuario.getSenha());
        colecaoUsuario.insertOne(documento);
        System.out.println("Usuário adicionado\n");
    }

    public void alterarUsuario(Usuario usuario){
        Bson filtro = Filters.eq("cpf", usuario.getCpf());
        Document novoUsuario = new Document("$set", new Document("nome",  usuario.getNome())
                                                             .append("email", usuario.getEmail())
                                                             .append("senha", usuario.getSenha()));

        UpdateResult resultado = colecaoUsuario.updateOne(filtro, novoUsuario);

        if(resultado.getModifiedCount() > 0) {
            System.out.println("Usuário alterado\n");
        } else {
            System.out.println("Nenhum usuário encontrado\n");
        }
    }

    public void removerUsuario(Usuario usuario){
        Bson filtro = Filters.eq("cpf", usuario.getCpf());
        DeleteResult resultado = colecaoUsuario.deleteOne(filtro);

        if (resultado.getDeletedCount() > 0) {
            System.out.println("Usuário removido\n");
        } else {
            System.out.println("Nenhum usuário encontrado\n");
        }
    }
}