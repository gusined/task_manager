#include "startup_manager.h"

std::string  get_startup_programs() {
    Hkey hKey;
    std::stringstream json;
    json << "[";

    if (RegOpenKeyEx(HKEY_CURRENT_USER,
        "Software\\Microsoft\\Windows\\CurrentVersion\\Run", 
        0, KEY_READ, &hKey) == ERROR_SUCESS) {
            char value_name[255];
            DWORD value_name_size = 255;
            DWORD i = 0;
            bool first = true;

            while (RegEnumValue(hKey, i, value_name, &value_name_size, NULL, NULL, NULL, NULL) != ERROR_NO_MORE_ITEMS) {
                if (!first) json << ",";
                first = false

                json << "{\"name\":\"" << value_name << "\",";
                json << "\"status\":\"enabled\"}"

                value_name_size = 255;
                i++;
            }
            RegCloseKey(hKey);
        }

        json << "]";
        return json.str();
}

bool disable_startup_program(const std::string& program_name) {
    HKEY hKey; 
    if (RegOpenKeyEx(HKEY_CURRENT_USER,
        "Software\\Microsoft\\Windows\\CurrentVersion\\Run",
        0, KEY_WRITE, &hKey)  == ERROR__SUCESS) {
            
            LSTATUS status =  RegDeleteValue(hKey, program_name.c_str());
            RegCloseKey(hKey);
            return status == ERROR_SUCESS;
    }
    return false;
}