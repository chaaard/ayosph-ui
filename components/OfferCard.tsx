import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export default function OfferCard() {
  return (
    <Card
      sx={{
        borderRadius: 2,
        background: "linear-gradient(135deg, #5853e6, #7775eb)",
        color: "#fff",
        p: 2,
        mt: 2,
        mx: 5,
      }}
      elevation={0}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{ opacity: 0.9, fontWeight: 500 }}
          >
            LIMITED OFFER
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            20% off your first booking
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Use code <b>WELCOME20</b> at checkout
          </Typography>

          <Box sx={{ mt: 1 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#5853e6",
                fontWeight: 600,
                borderRadius: 3,
                px: 3,
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              Book Now
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}