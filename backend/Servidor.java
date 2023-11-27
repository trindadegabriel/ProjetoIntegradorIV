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

    private static final String DIRETORIO_ARQUIVOS = "frontend/";

    public static void main(String[] args) throws IOException {
        int porta = 3000;
        ServerSocket socketServidor = new ServerSocket(porta);
        System.out.println("Servidor aguardando conexões na porta: " + porta);

        try {
            while (true){
                Socket socketCliente = socketServidor.accept();
                processarRequisicao(socketCliente);
            }
        } finally {
            socketServidor.close();
        }
    }

    private static void processarRequisicao(Socket socketCliente) throws IOException {
        try (
            BufferedReader input = new BufferedReader(new InputStreamReader(socketCliente.getInputStream()));
            OutputStream output = socketCliente.getOutputStream()
        ) {
            String linhaRequisicao = input.readLine();
            if(linhaRequisicao != null){
                String[] partesRequisicao = linhaRequisicao.split(" ");
                if(partesRequisicao.length == 3 && partesRequisicao[0].equals("GET")){
                    String caminhoArquivoStr = DIRETORIO_ARQUIVOS + partesRequisicao[1];
                    Path caminhoArquivo = Paths.get(caminhoArquivoStr);

                    if(Files.exists(caminhoArquivo)){
                        byte[] bytesDoArquivo = Files.readAllBytes(caminhoArquivo);
                        output.write("HTTP/1.1 200 OK\r\n".getBytes());
                        output.write(("Content-Length: " + bytesDoArquivo.length + "\r\n").getBytes());
                        output.write("\r\n".getBytes());
                        output.write(bytesDoArquivo);
                    } else if (partesRequisicao[1].equals("/bancos.json")){
                        byte[] bytesJson = Files.readAllBytes(Paths.get("frontend/tela-infos-doacao/bancos.json"));
                        output.write("HTTP/1.1 200 OK\r\n".getBytes());
                        output.write(("Content-Length: " + bytesJson.length + "\r\n").getBytes());
                        output.write("\r\n".getBytes());
                        output.write(bytesJson);
                    } else {
                        output.write("HTTP/1.1 404 Not Found\r\n".getBytes());
                        output.write("Content-Length: 0\r\n\r\n".getBytes());
                    }
                }
            }
        } finally {
            socketCliente.close();
        }
    }
}
