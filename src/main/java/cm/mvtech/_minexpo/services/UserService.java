package cm.mvtech._minexpo.services;

import cm.mvtech._minexpo.beans.User;
import cm.mvtech._minexpo.model.dto.UserResponseDTO;

public interface UserService {

    User getCurrentUser();

    UserResponseDTO getProfile();
}
