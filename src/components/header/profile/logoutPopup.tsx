import { Modal, Typography } from "@mui/material";
import { styles } from "./styles";

import { Box } from "@mui/system";
import ContainedButton from "components/button/contained-button";

interface Props {
  updateShowPopup: Function;
}

export default function LogoutPopup({ updateShowPopup }: Props) {
  const handleLogout = async () => {
    sessionStorage.clear();
    window.location.reload();
  };

  const handleCancel = () => {
    updateShowPopup(false);
  };

  return (
    <Modal
      open={true}
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
    >
      <Box sx={styles.mainContainer}>
        <Box sx={styles.heading}>
          <Typography sx={styles.heading_ac} variant="h2" component="h2">
            {"Logout"}
          </Typography>
        </Box>
        <Box sx={styles.modal}>
          <Typography variant="h3" component="h2">
            {"Are you sure you want to Logout?"}
          </Typography>
          <Box sx={styles.button}>
            <ContainedButton
              style={{ minWidth: "140px" }}
              onClick={handleCancel}
              title={"Cancel"}
              fullWidth
            />
            <ContainedButton
              style={{ minWidth: "140px" }}
              title={"Logout"}
              onClick={handleLogout}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
