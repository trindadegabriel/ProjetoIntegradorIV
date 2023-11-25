package backend;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Servidor {

    private static final String STATIC_FILES_DIR = "frontend/";

    public static void main(String[] args) throws IOException {
        int porta = 3000;
        ServerSocket serverSocket = new ServerSocket(porta);
        System.out.println("Servidor aguardando conexões na porta: " + porta);

        try {
            while (true) {
                Socket clientSocket = serverSocket.accept();
                handleRequest(clientSocket);
            }
        } finally {
            serverSocket.close();
        }
    }

    private static void handleRequest(Socket clientSocket) throws IOException {
        try (
            BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            OutputStream out = clientSocket.getOutputStream()
        ) {
            String requestLine = in.readLine();
            if (requestLine != null) {
                String[] requestComponents = requestLine.split(" ");
                if (requestComponents.length == 3 && requestComponents[0].equals("GET")) {
                    String filePathStr = STATIC_FILES_DIR + requestComponents[1];
                    Path filePath = Paths.get(filePathStr);

                    if (Files.exists(filePath)) {
                        byte[] fileBytes = Files.readAllBytes(filePath);
                        out.write("HTTP/1.1 200 OK\r\n".getBytes());
                        out.write(("Content-Length: " + fileBytes.length + "\r\n").getBytes());
                        out.write("\r\n".getBytes());
                        out.write(fileBytes);
                    } else {
                        out.write("HTTP/1.1 404 Not Found\r\n".getBytes());
                        out.write("Content-Length: 0\r\n\r\n".getBytes());
                    }
                }
            }
        } finally {
            clientSocket.close();
        }
    }
}
