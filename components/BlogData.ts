// ─── BLOG DATA ────────────────────────────────────────────────────────────────
 
export type BlogStep = {
  title: string;
  body: string;
  images?: string[];
  code?: string;
};
 
export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  steps: BlogStep[];
  tags: string[];
  placeholder?: boolean;
};
 
const HYDRO_IMAGES = {
  cover:  "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823079/WhatsApp_Image_2026-04-22_at_2.52.29_AM_fzju9a.jpg",
  img1:    "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823079/WhatsApp_Image_2026-04-22_at_2.51.53_AM_3_vwzsqf.jpg",
  img2:    "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823078/WhatsApp_Image_2026-04-22_at_2.51.53_AM_vlxyci.jpg",
  img3:    "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823078/WhatsApp_Image_2026-04-22_at_2.51.34_AM_qzvxtz.jpg",
  img4:    "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823077/WhatsApp_Image_2026-04-22_at_2.51.50_AM_gkbxl9.jpg",
  img5:    "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823077/WhatsApp_Image_2026-04-22_at_2.51.34_AM_1_grufai.jpg",
  img6:    "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823076/WhatsApp_Image_2026-04-22_at_2.51.52_AM_2_lada02.jpg",
  img7:    "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823077/WhatsApp_Image_2026-04-22_at_2.51.52_AM_d6qeza.jpg",
  img8:    "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823076/WhatsApp_Image_2026-04-22_at_2.51.52_AM_1_kawnvg.jpg",
  img9:    "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823076/WhatsApp_Image_2026-04-22_at_2.51.53_AM_2_rcw2k1.jpg",
  img10:   "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823075/WhatsApp_Image_2026-04-22_at_2.51.35_AM_1_r57wkk.jpg",
  img11:   "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823075/WhatsApp_Image_2026-04-22_at_2.51.35_AM_mjc7p6.jpg",
  video1:  "https://res.cloudinary.com/dz6kxumoo/video/upload/v1776823165/WhatsApp_Video_2026-04-22_at_2.51.32_AM_mxujrk.mp4",
  video2:  "https://res.cloudinary.com/dz6kxumoo/video/upload/v1776823103/WhatsApp_Video_2026-04-22_at_2.51.49_AM_innoex.mp4",
};
 
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "hydroponic-system-build",
    title: "Building a Low-Cost Automated Hydroponic System",
    subtitle: "Soil-less farming powered by Arduino, servo motors, and a 6V battery",
    category: "Electronics & Automation",
    date: "April 2026",
    readTime: "12 min read",
    coverImage: HYDRO_IMAGES.cover,
    excerpt:
      "A fully automated hydroponic watering system built from scratch using Arduino, servo motors(Featured has been removed for mechanical simplicity), a water pump, and a regulated 12V power supply — designed for efficient, soil-less plant growth.",
    tags: ["Arduino", "Hydroponics", "Automation", "Electronics", "Embedded Systems"],
    steps: [
      {
        title: "Introduction",
        body: `Hydroponics is a method of growing plants without soil, using mineral nutrient solutions in a water solvent. It allows for more efficient water usage, faster plant growth, and year-round cultivation in controlled environments.\n\nThe goal of this project was to build a low-cost automated hydroponic system using off-the-shelf components and an Arduino microcontroller — making soil-less farming accessible without expensive commercial solutions.\n\nThe system automates water distribution using servo-controlled valves and a DC pump, timed and sequenced by Arduino logic. Power is managed through a 6V lead-acid battery with an LM2596 step-down module to provide clean, regulated voltage to sensitive components.`,
        images: [HYDRO_IMAGES.cover, HYDRO_IMAGES.img1],
      },
      {
        title: "Components Used",
        body: `Everything in this build was sourced locally or from low-cost online suppliers. Here is a complete parts list:\n\n· Arduino Uno — the brain of the system, handling all timing and control logic\n· 12V L-ion Battery(3s 2p connection to bms(3s 40A) — main power source, chosen for its current delivery capability\n· LM2596 Step-Down Buck Converter — regulates voltage from battery to stable levels for Arduino and servos\n· 2× SG90 Servo Motors — used as light actuators to direct light flow and intensity between two towers(featured has been removed for mechanical simplicity)n· 12V DC Surface Water Pump — drives water from the reservoir through the tubing\n· Silicone Tubing — flexible, food-safe tubing for water routing\n· Reservoir Container — holds the nutrient-water solution\n· Breadboard + jumper wires — for prototyping and connections\n· N-Channel MOSFET (IRLZ44N) (switched to High power MOSFET PMW Switch module)— for switching the pump load safely from Arduino`,
        images: [HYDRO_IMAGES.img3, HYDRO_IMAGES.img5],
      },
      {
        title: "System Design",
        body: `The system is split into two clear domains: logic and load.\n\nThe Arduino handles all logic — timing cycles, servo positions, pump on/off signals. It runs at 5V (USB or regulated supply) and must never be connected directly to the pump or servo power rail without proper isolation.\n\nThe load side (pump + servos under load) is powered directly from the 12V battery through the LM2596 buck converter, set to output 5.5V for stable servo operation. The pump is switched via a MOSFET — the Arduino sends a 5V signal to the gate, which closes the circuit and drives the pump from the battery rail.\n\nCritically, all components share a common ground. This is non-negotiable in mixed-voltage systems — without a common ground reference, signals between the Arduino and MOSFET gate become undefined and the system behaves erratically.\n\nPower flow: Battery → LM2596 → Servos + Pump rail\n Logic flow: USB → Arduino → MOSFET gate → Pump on/off`,
        images: [HYDRO_IMAGES.img4, HYDRO_IMAGES.img10],
      },
      {
        title: "Step 1 — Setting Up the Reservoir",
        body: `The reservoir is a sealed plastic container with two holes drilled into the lid: one for the pump intake tube and one for the return/drain line.\n\nThe pump sits submerged at the bottom of the reservoir. A short length of silicone tubing connects the pump outlet to the main distribution line which runs to the tubing above the plant channels.\n\nThe container was filled with a diluted hydroponic nutrient solution — a 1:500 mix of a standard NPK concentrate in clean water. pH was adjusted to 6.0–6.5 using pH up/down solution before first use.(implementing soon,regular water is currently being used as a placeholder medium for testing)`,
        images: [HYDRO_IMAGES.img6, HYDRO_IMAGES.img7],
      },
      {
        title: "Step 2 — Tubing and Pump Connection",
        body: `Silicone tubing (8mm OD, 6mm ID) was routed from the pump outlet up to a T-junction that splits flow to two servo-controlled valve arms.\n\nEach servo arm has a short section of tubing crimped by a 3D-printed clamp attached to the servo horn. When the servo rotates to 0°, the clamp opens and water flows freely. At 90°, the clamp pinches the tube closed.\n\nThis approach avoids the cost of solenoid valves and keeps the entire system under 500mA total current draw, well within the battery's discharge rating.`,
        images: [HYDRO_IMAGES.img8, HYDRO_IMAGES.img9],
      },
      {
        title: "Step 3 — Wiring the Power System",
        body: `The LM2596 module was adjusted using its onboard potentiometer to output exactly 5.5V under no load. This voltage drops slightly under servo load — which is expected — but stays above the 4.8V minimum threshold for reliable SG90 operation.\n\nThe MOSFET drain connects to the pump negative terminal, source to ground, and gate to Arduino Pin 7 through a 220Ω resistor. A flyback diode (1N4007) was placed across the pump terminals to suppress voltage spikes from the inductive motor winding when switching off.\n\nAll ground rails — Arduino GND, battery negative, LM2596 output GND — were connected together at a single point to establish a clean common ground reference.`,
        images: [HYDRO_IMAGES.img11, HYDRO_IMAGES.img2],
      },
      {
        title: "Step 4 — Connecting the Servos",
        body: `Servo 1 controls the left channel valve and is connected to Arduino Pin 9 (PWM-capable). Servo 2 controls the right channel and connects to Pin 10.\n\nBoth servos are powered from the LM2596 output rail — NOT from the Arduino 5V pin. Powering servos from the Arduino's onboard regulator causes brown-outs and resets under load. Always power servos externally.\n\nServo signal wires connect to the Arduino pins directly — the PWM signal is low-current and safe to drive from the Arduino's I/O pins.`,
        images: [HYDRO_IMAGES.img1, HYDRO_IMAGES.img3],
      },
      {
        title: "Step 5 — Arduino Integration",
        body: `The Arduino sketch implements a simple irrigation cycle:\n\n1. Pump turns ON\n2. Servo 1 opens (0° → 90°) — waters channel A\n3. Servo 1 closes, Servo 2 opens (0° → 90°) — waters channel B\n4. Both servos return to closed position\n5. Pump turns OFF\n6. System waits 2 seconds, then repeats\n\nThe delay values can be adjusted in the code to tune irrigation duration per channel. Future iterations will replace hardcoded delays with sensor-driven logic (soil moisture or flow sensors).`,
        code: `#include <Servo.h>
 
Servo servo1;
Servo servo2;
 
int pumpPin = 7;
 
void setup() {
  servo1.attach(9);
  servo2.attach(10);
  pinMode(pumpPin, OUTPUT);
}
 
void loop() {
  // Turn pump ON
  digitalWrite(pumpPin, HIGH);
 
  // Open channel A — sweep servo1 from 0 to 90 degrees
  for (int pos = 0; pos <= 90; pos++) {
    servo1.write(pos);
    delay(20);
  }
 
  delay(500); // Hold channel A open for 500ms
 
  // Close A, open channel B — sweep servo2 from 0 to 90 degrees
  for (int pos = 90; pos >= 0; pos--) {
    servo2.write(pos);
    delay(20);
  }
 
  delay(500); // Hold channel B open
 
  // Turn pump OFF and wait before next cycle
  digitalWrite(pumpPin, LOW);
  delay(2000);
}`,
        images: [HYDRO_IMAGES.img4],
      },
      {
        title: "Challenges",
        body: `Three main problems came up during testing:\n\n1. Power Instability — The first iteration powered everything from the Arduino's 5V pin. Under servo load, voltage dropped below 4.5V and the Arduino reset repeatedly. Solved by adding the LM2596 external supply.\n\n2. Servo Current Spikes — SG90 servos draw up to 700mA at stall. With two servos potentially stalling simultaneously, the supply rail collapsed. Solved by staggering servo movement sequences in software so only one servo moves at a time.\n\n3. Voltage Regulation Noise — The LM2596 is a switching regulator and introduces high-frequency noise on the supply rail. This caused erratic servo jitter. Added a 100µF electrolytic cap and a 0.1µF ceramic cap across the output rail to filter switching noise.`,
        images: [HYDRO_IMAGES.img5, HYDRO_IMAGES.img6],
      },
      {
        title: "Results",
        body: `The finished system runs reliable irrigation cycles autonomously. Both channels water sequentially with clean servo actuation and no pump chatter or servo jitter after the capacitor fix.\n\nWater flow through each channel is approximately 180ml/min at 5.5V pump supply — sufficient for small herb or leafy green cultivation in a 2-channel NFT (Nutrient Film Technique) setup.\n\nThe total build cost came to approximately ₦12,000 — significantly below commercial hydroponic controller units which start at ₦80,000+.`,
        images: [HYDRO_IMAGES.img7, HYDRO_IMAGES.img8],
      },
      {
        title: "Future Improvements",
        body: `Several upgrades are planned for the next iteration:\n\n· pH and EC sensors — real-time monitoring of nutrient solution quality\n· Soil/substrate moisture sensors — demand-driven watering instead of timed cycles\n· DHT22 temperature and humidity sensor — environmental monitoring\n· ESP8266 WiFi module — IoT integration for remote monitoring and control via a simple web dashboard\n· Scalability — expanding to 6–8 channels using a servo driver board (PCA9685) for larger vertical farming setups\n· Battery monitoring — INA219 current sensor to track state of charge and log power consumption`,
        images: [HYDRO_IMAGES.img9, HYDRO_IMAGES.img10],
      },
    ],
  },
 
  // ── Placeholder posts ──────────────────────────────────────────────────────
 
  {
    id: "2",
    slug: "cnc-pen-plotter",
    title: "CNC Pen Plotter from Salvaged Printer Parts",
    subtitle: "Repurposing old inkjet hardware into a precision drawing machine",
    category: "CNC & Fabrication",
    date: "Coming Soon",
    readTime: "~10 min read",
    coverImage: "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771896340/Car_Scissor_Jack_Assembly.png_fspnaz.png",
    excerpt:
      "Salvaged stepper motors and linear rails from a broken inkjet printer become the foundation for a working CNC pen plotter — driven by GRBL and controlled via G-code.",
    tags: ["CNC", "GRBL", "Stepper Motors", "Fabrication"],
    steps: [],
    placeholder: true,
  },
  {
    id: "3",
    slug: "solar-charge-controller",
    title: "DIY MPPT Solar Charge Controller",
    subtitle: "Maximum power point tracking with an STM32 and custom PCB",
    category: "Power Electronics",
    date: "Coming Soon",
    readTime: "~15 min read",
    coverImage: "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771895342/Screenshot_2026-02-24_005631_cvbaxw.png",
    excerpt:
      "Designing and building a custom MPPT solar charge controller around the STM32F103 — including schematic, PCB layout, and firmware for perturb-and-observe tracking.",
    tags: ["Solar", "PCB Design", "STM32", "Power Electronics"],
    steps: [],
    placeholder: true,
  },
  {
    id: "4",
    slug: "robotic-arm-4dof",
    title: "4-DOF Robotic Arm with Inverse Kinematics",
    subtitle: "3D printed arm with servo actuation and IK solver in C++",
    category: "Robotics",
    date: "Coming Soon",
    readTime: "~18 min read",
    coverImage: "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771896658/Mechanical_scissor_jack_Drawing_page-0001_xh5dng.jpg",
    excerpt:
      "A 4-degree-of-freedom robotic arm designed in SolidWorks, 3D printed in PLA, and controlled with a geometric inverse kinematics solver running on Arduino Mega.",
    tags: ["Robotics", "SolidWorks", "Arduino", "3D Printing", "Kinematics"],
    steps: [],
    placeholder: true,
  },
];