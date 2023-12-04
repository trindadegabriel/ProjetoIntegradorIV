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

import backend.controller.Cadastro;
import backend.controller.Login;
import backend.model.GerenciadorDeSessao;

public class Servidor {

    private static final String DIRETORIO_ARQUIVOS = "src/frontend/";

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

                    if (!verificarToken(input) && !linhaRequisicao.contains("/tela-login/")) {
                        output.write("HTTP/1.1 302 Found\r\n".getBytes());
                        output.write("Location: /tela-login/telalogin.html\r\n".getBytes());
                        output.write("Content-Length: 0\r\n\r\n".getBytes());
                        return;
                    }

                    if(Files.exists(caminhoArquivo)){
                        byte[] bytesDoArquivo = Files.readAllBytes(caminhoArquivo);
                        output.write("HTTP/1.1 200 OK\r\n".getBytes());
                        output.write(("Content-Length: " + bytesDoArquivo.length + "\r\n").getBytes());
                        output.write("\r\n".getBytes());
                        output.write(bytesDoArquivo);
                    } else if (partesRequisicao[1].equals("/bancos.json")){
                        byte[] bytesJson = Files.readAllBytes(Paths.get("src/frontend/tela-infos-doacao/bancos.json"));
                        output.write("HTTP/1.1 200 OK\r\n".getBytes());
                        output.write(("Content-Length: " + bytesJson.length + "\r\n").getBytes());
                        output.write("\r\n".getBytes());
                        output.write(bytesJson);
                    } else {
                        output.write("HTTP/1.1 404 Not Found\r\n".getBytes());
                        output.write("Content-Length: 0\r\n\r\n".getBytes());
                    }
                }
                if(partesRequisicao.length == 3 && partesRequisicao[0].equals("POST")){
                    if(partesRequisicao[1].equals("/cadastrar")){
                        int contentLength = 0;
                        while(!(linhaRequisicao = input.readLine()).isEmpty()) {
                            if(linhaRequisicao.startsWith("Content-Length:")) {
                                contentLength = Integer.parseInt(linhaRequisicao.substring(16).trim());
                            }
                        }

                        StringBuilder corpoRequisicao = new StringBuilder();
                        for (int i = 0; i < contentLength; i++) {
                            corpoRequisicao.append((char) input.read());
                        }

                        String[] dados = corpoRequisicao.toString().split("&");
                        String nome = null, cpf = null, email = null, senha = null;

                        for(String dado : dados) {
                            String[] par = dado.split("=");
                            if(par.length == 2) {
                                String chave = par[0];
                                String valor = par[1].replace("+", " ");
                                valor = java.net.URLDecoder.decode(valor, "UTF-8");

                                switch(chave) {
                                    case "nome":
                                        nome = valor;
                                        break;
                                    case "cpf":
                                        cpf = valor;
                                        break;
                                    case "email":
                                        email = valor;
                                        break;
                                    case "senha":
                                        senha = valor;
                                        break;
                                }
                            }
                        }
                        boolean resultadoCadastro = Cadastro.cadastrarUsuario(nome, cpf, email, senha);
                        if(resultadoCadastro == true){
                            output.write("HTTP/1.1 200 OK\r\n".getBytes());
                            output.write("Content-Length: 0\r\n\r\n".getBytes());
                        } else {
                            output.write("HTTP/1.1 400 Bad Request\r\n".getBytes());
                            output.write("Content-Length: 0\r\n\r\n".getBytes());
                        }
                    }
                    else if(partesRequisicao[1].equals("/login")) {
                        int contentLength = 0;
                        while(!(linhaRequisicao = input.readLine()).isEmpty()) {
                            if(linhaRequisicao.startsWith("Content-Length:")) {
                                contentLength = Integer.parseInt(linhaRequisicao.substring(16).trim());
                            }
                        }

                        StringBuilder corpoRequisicao = new StringBuilder();
                        for (int i = 0; i < contentLength; i++) {
                            corpoRequisicao.append((char) input.read());
                        }

                        String[] dadosLogin = corpoRequisicao.toString().split("&");
                        String email = null, senha = null;

                        for(String dado : dadosLogin) {
                            String[] par = dado.split("=");
                            if(par.length == 2) {
                                String chave = par[0];
                                String valor = par[1].replace("+", " ");
                                valor = java.net.URLDecoder.decode(valor, "UTF-8");

                                switch(chave) {
                                    case "email":
                                        email = valor;
                                        break;
                                    case "senha":
                                        senha = valor;
                                        break;
                                }
                            }
                        }
                        if(Login.buscarUsuario(email, senha) != null){
                            String token = GerenciadorDeSessao.iniciarSessao(email);
                            output.write("HTTP/1.1 200 OK\r\n".getBytes());
                            output.write(("Set-Cookie: token=" + token + "; Path=/\r\n").getBytes());
                            output.write("Content-Length: 0\r\n\r\n".getBytes());
                        } else {
                            output.write("HTTP/1.1 401 Unauthorized\r\n".getBytes());
                            output.write("Content-Length: 0\r\n\r\n".getBytes());
                        }
                    }
                }
            }
        } finally {
            socketCliente.close();
        }
    }

    private static boolean verificarToken(BufferedReader input) throws IOException {
        String linha;
        while ((linha = input.readLine()) != null && !linha.isEmpty()) {
            if (linha.startsWith("Cookie:")) {
                String[] cookies = linha.split(" ");
                for (String cookie : cookies) {
                    if (cookie.startsWith("token=")) {
                        String token = cookie.substring(6);
                        return GerenciadorDeSessao.verificarSessao(token);
                    }
                }
            }
        }
        return false;
    }
}