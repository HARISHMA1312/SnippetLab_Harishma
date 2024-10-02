// PaymentGateway Interface
interface PaymentGateway {
    void processPayment(double amount);
}

// BusTrackingService Interface
interface BusTrackingService {
    void getBusLocation(String busId);
}

// PayPal API
class PayPalAPI {
    public void makePayment(double amount) {
        System.out.println("Processing payment of $" + amount + " using PayPal.");
    }
}

// Stripe API
class StripeAPI {
    public void chargePayment(double amount) {
        System.out.println("Processing payment of $" + amount + " using Stripe.");
    }
}

// Google Maps API
class GoogleMapsAPI {
    public void trackBus(String busId) {
        System.out.println("Tracking bus with ID: " + busId + " using Google Maps.");
    }
}

// Here Maps API
class HereMapsAPI {
    public void getBusPosition(String busId) {
        System.out.println("Tracking bus with ID: " + busId + " using Here Maps.");
    }
}

// PayPal Adapter
class PayPalAdapter implements PaymentGateway {
    private PayPalAPI payPalAPI;

    public PayPalAdapter() {
        this.payPalAPI = new PayPalAPI();
    }

    @Override
    public void processPayment(double amount) {
        payPalAPI.makePayment(amount);
    }
}

// Stripe Adapter
class StripeAdapter implements PaymentGateway {
    private StripeAPI stripeAPI;

    public StripeAdapter() {
        this.stripeAPI = new StripeAPI();
    }

    @Override
    public void processPayment(double amount) {
        stripeAPI.chargePayment(amount);
    }
}

// Google Maps Adapter
class GoogleMapsAdapter implements BusTrackingService {
    private GoogleMapsAPI googleMapsAPI;

    public GoogleMapsAdapter() {
        this.googleMapsAPI = new GoogleMapsAPI();
    }

    @Override
    public void getBusLocation(String busId) {
        googleMapsAPI.trackBus(busId);
    }
}

// Here Maps Adapter
class HereMapsAdapter implements BusTrackingService {
    private HereMapsAPI hereMapsAPI;

    public HereMapsAdapter() {
        this.hereMapsAPI = new HereMapsAPI();
    }

    @Override
    public void getBusLocation(String busId) {
        hereMapsAPI.getBusPosition(busId);
    }
}

// Main class to demonstrate the Adapter Pattern
public class Main {
    public static void main(String[] args) {
        // Example 1: PayPal Payment
        PaymentGateway paymentGateway = new PayPalAdapter();
        paymentGateway.processPayment(100.00);

        // Example 2: Stripe Payment
        paymentGateway = new StripeAdapter();
        paymentGateway.processPayment(200.00);

        // Example 3: Google Maps Bus Tracking
        BusTrackingService busTrackingService = new GoogleMapsAdapter();
        busTrackingService.getBusLocation("BUS123");

        // Example 4: Here Maps Bus Tracking
        busTrackingService = new HereMapsAdapter();
        busTrackingService.getBusLocation("BUS456");
    }
}