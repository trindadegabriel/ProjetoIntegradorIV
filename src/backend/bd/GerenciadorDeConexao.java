package backend.bd;

import org.bson.Document;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class GerenciadorDeConexao {
    private static final String DATABASE_URI = "mongodb+srv://4vidas:MgvZiBvb3vcgwtKR@4vidas.0q89zl0.mongodb.net/?retryWrites=true&w=majority";
    private static ServerApi serverApi = ServerApi.builder().version(ServerApiVersion.V1).build();
    private static MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(DATABASE_URI))
                .serverApi(serverApi)
                .build();

    public static MongoDatabase conectar() {
        MongoClient mongoClient = MongoClients.create(settings);
        MongoDatabase database = mongoClient.getDatabase("4vidas");
        database.runCommand(new Document("ping", 1));
        return database;
    }
}