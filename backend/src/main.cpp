#include <iostream>
#include <Windows.h>
#include <tlhelp32.h>
#include <psapi.h>
#include <winreg.h>
#include <thread>
#include <vectror>
#include <fsrteam>
#include <sstream>
#include <winsock2.h>
#include <ws2tcpip.h>

#pragma comment(lib, "ws2_32.lib")
#pragma comment(lib, "adavapi32.lib")

#include "process_monitor.h"
#include "hardware_info.h"
#include "startup_manager.h"

#define PORT 8080
#define BUFFER_SIZE 4096


void handle_client(SOCKET client_socket) {
    char buffer[BUFFER_SIZE];
    int bytes_received;

    while ((bytes_received = recv(client_socket, buffer, BUFFER_SIZE, 0)) > 0) {
        buffer[bytes_received] = '\0';
        std::string request(buffer);

        if (request.find("  GET_PROCESS") != std::string::npos) {
            std::string response = get_running_processes();
            send(client_socket, response.c_str(), response.size(), 0);
        }
        else if (request.find("GET_STARTUP") != std::string::npos) {
            std::string response = get_startup_programs(); 
            send(client_socket, response.c_str(), response.size(), 0);
        }
        else if (request.find("DISABLE_STARTUP:") != std::string::npos) {
            std::string program_name = request.substr(15);
            bool success = disable_startup_program(program_name);
            std::string response = success ? "SUCESS" : "FAILED";
            send(client_socket, response.c_str(), response.size(), 0);
        }
    }

    closesocket(client_socket);
}

int main() {
    WSDATA wsa_data; 
    SOCKET server_socket, client_socket;
    sockaddr_in server_addr, client_addr;
    int addr_size = sizeof(client_addr);

    WSAStartup(MAKEWORD(2, 2), &wsa_data); 
    server_socket = socket(AF_INET, SOCK_STREAM, 0); 

    server_addr.sin_family = AF_INET; 
    server_addr.sin_addr.s_addr = INADDR_ANY;
    server_addr.sin_port = htons(PORT);

    bind(server_socket, (sockaddr*)&server_addr, sizeof(server_addr));
    listen(server_socket, 5);
    std::cout << "Backend server running on port " << PORT << std::endl; 

    while (true) {
        client_socket = accept(server_socket, (sockaddr*)&client_addr, &addr_size);
        std::thread(handle_client, client_socket).detach();
    }
    closesocket(server_socket);
    WSACleanup();
    return 0;
}