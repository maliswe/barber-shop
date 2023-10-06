import axois from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/admin';

export const admin = {
    getAllAdmins(){
        return axois.get(`${BASE_URL}`);
    },

    getAdmin(id){
        return axois.get(`${BASE_URL}/${id}`)
    },

    createAdmin(adminData) {
        return axois.post(`${BASE_URL}`, adminData)
    },

    updateAdmin(id, adminDate) {
        return axois.put(`${BASE_URL}/${id}`, adminDate)
    },

    deleteAdmin(id) {
        return axois.delete(`${BASE_URL}/${id}`)
    }
}