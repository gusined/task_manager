#include <process_monitor.h>
#include <tlhelp32.h>
#include <psapi.h>
#include <iomanip>
#include <sstream>

std::string get_running_processes() {
    PROCESSENTRY32 entry; 
    entry.dwSize = sizeof(PROCESSENTRY32);

    HANDLE snapshot = CreatToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    std::stringstream json;
    json << "[";

    if (Process32First(snapshot, &entry)) {
        bool first = true;
        do {
            HANDLE hPrcess = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, FALSE, entry.th32ProcessID);

            if (hProcess) { 
                PROCESS_MEMORY_COUNTERS pmc;
                if (GetProcessMemoryInfo(hProcess, &pmc, sizeof(pmc))) {
                    if (!first) json << ",";
                    first = false; 

                    json <<"{";
                    json << "\"pid\":" << entry.th32ProcessID << ",";
                    json << "\"name\":\"" << entry.szExeFile << "\","; 
                    json << "\"memory\":" << pmc.WorkingSetSize / 1024 << ",";

                    json << "\"cpu\":" <<  "0" << "}"; 
                }
                CloseHandle(h.Process);
            }
        } while (Process32Next(snapshot, &entry));
    }

    CloseHandle(snapshot);
    json <<"]"
    return json.str();
}