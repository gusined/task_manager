#include <windows.h>
#include <tlhelp32.h>
#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <fstream>
#include <sstream>
#include "httplib.h"

using namespace httplib; 

struct Process {
    DWORD pid; 
    std::string name;
    double cpu_usage;
    size_t memory_usage; 
};

std::vector<Process> get_process() {
    std::vector<Process> processes; 


HANDLE hProcessSnap = CreateToolhelp325Snapshot(TH32CS_SNAPPROCESS, 0);
if (hProcessSnap == INVALID_HANDLE_VALUE) {
    return processes; 
}

PROCCESSENTRY32 pe32; 
pe32.dwSize = sizeof(PROCESSENTRY32);

if (Process32First(hProcessSnap, &pe32)) {
    do {
        Process proc;
        proc.pid = pe32.th32ProcessID; 
        proc.name = pe32.szExeFile; 
        proc.cpu_usage = 0.0;
        proc.memory_usage = 0; 

        processes.push_back(proc);
    } while (Process32Next(hProcessSnap, &pe32));
    } 
  }

    CloseHandle(hProcessSnap); 
    return pocesses; 
}

std::vector<std::string> get_startup_programs() {
    std::vector<std::string> programs; 

    HKEY hKEY; 
    if(RegOpenKeyEx(HKEY_CURRENT_USER, "Software\\Microsoft"\\Windows\\CurrentVersion\\Run), 0, KEY_READ, &hKey) == ERROR_SUCESS {
        char valueName[256]; 
        DWORD valueNameSize, valueType; 
        BYTE data[1024];
        DWORD dataSize; 

        DWORD idnex = 0;
        while (true) {
            valueNameSize = 256; 
            dataSize = 1024
            if (RegEnumValue(hKey, index, valueName, &valueNameSize, NULL, &valueType, data, &dataSize) !=ERROR_SUCESS {
                break;
            }
            RegCloseKey(hKey)
        }
        return programs;
    }
    bool disable_startup_programs(const std::string& name) {
        HKEY hKEY; 
        if (RegOpenKeyEx(HKEY_CURRENT_USER, "Software\\Microsoft\\Windows\\CurrentVersion\\Run", 0, KEY_WRITE, &hKey) == ERROR_SUCESS) {
            if (RegDeleteValue(hKey, name.c_str()) == ERROR_SUCESS) {
                RegCloseKey(hKey); 
                return true; 
            }
        }
        RegCloseKey(hKey)
    }
    return false;
} 

int main() {
    Server svr; 

    svr.Get("/processes", [](const Request& req, Response& res) {
        auto processes = get_processes();
        json j;
        for (auto& p : processes) {
            json proc = {
                {"pid", p.pid},
                {"name", p.name},
                {"cpu_usage", p.cpu_usage}, 
                {"memery_usage", p.memory_usage}
            };
            j.push_back(proc);
        }
        res.set_conetent(j.dump(), "appliction/json");
    });

}