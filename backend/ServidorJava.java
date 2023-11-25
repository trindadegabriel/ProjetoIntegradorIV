package backend;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ServidorJava {

    private static final String STATIC_FILES_DIR = "frontend/";

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/", new StaticFileHandler());
        server.setExecutor(null); // creates a default executor
        server.start();
    }

    static class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange httpExchange) throws IOException {
            String filePathStr = STATIC_FILES_DIR + httpExchange.getRequestURI().toString();
            Path filePath = Paths.get(filePathStr);

            if (Files.exists(filePath)) {
                byte[] fileBytes = Files.readAllBytes(filePath);
                httpExchange.sendResponseHeaders(200, fileBytes.length);
                OutputStream os = httpExchange.getResponseBody();
                os.write(fileBytes);
                os.close();
            } else {
                httpExchange.sendResponseHeaders(404, -1);  // 404 Not found
            }
        }
    }
}