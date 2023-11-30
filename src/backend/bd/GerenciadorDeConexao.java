package backend.bd;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class GerenciadorDeConexao {
    private static final String DATABASE_URI = "mongodb+srv://4vidas:MgvZiBvb3vcgwtKR@4vidas.0q89zl0.mongodb.net/";

    public static MongoDatabase conectar() {
        try (MongoClient mongoClient = MongoClients.create(DATABASE_URI)) {
            return mongoClient.getDatabase("4vidas");
        } catch (Exception e) {
            System.err.println("Erro ao conectar: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        MongoDatabase database = conectar();
        System.out.println("Conexão estabelecida: " + database.toString());
    }
}