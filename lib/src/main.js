import { prefix } from "./constants";
import outlineWatcher from "./utils/outlineWatcher";

import { Knobs } from "./components/knobs";

import { Range } from "./components/range";
import { Button } from "./components/button";
import { Checkbox } from "./components/checkbox";
import { Modal } from "./components/modal";
import { Input } from "./components/input";
import { Radio } from "./components/radio";
import { Label } from "./components/label";
import { Box } from "./components/box";
import { Flex } from "./components/flex";
import { Text } from "./components/text";
import { Container } from "./components/container";
import { Toggle } from "./components/toggle";
import { TextArea } from "./components/textarea";
import { Tabs, Tab } from "./components/tabs";
import { Grid, GridItem } from "./components/grid";
import { Select, Option, OptGroup } from "./components/select";
import { Accordion, AccordionItem } from "./components/accordion";
import { Menu, MenuItem } from "./components/menu";
import { Overlay } from "./components/overlay";
import { Slider, SliderItem } from "./components/slider";

export {
  outlineWatcher,
  Knobs,
  Slider,
  SliderItem,
  Accordion,
  Button,
  Checkbox,
  Modal,
  Input,
  Radio,
  Label,
  Box,
  Flex,
  Text,
  Container,
  Toggle,
  TextArea,
  Tabs,
  Grid,
  GridItem,
  Select,
  Option,
  OptGroup,
  Menu,
  MenuItem,
  Range,
  Overlay,
  AccordionItem,
};

customElements.define(`${prefix}-accordion`, Accordion);
customElements.define(`${prefix}-accordion-item`, AccordionItem);
customElements.define(`${prefix}-button`, Button);
customElements.define(`${prefix}-checkbox`, Checkbox);
customElements.define(`${prefix}-modal`, Modal);
customElements.define(`${prefix}-input`, Input);
customElements.define(`${prefix}-radio`, Radio);
customElements.define(`${prefix}-label`, Label);
customElements.define(`${prefix}-box`, Box);
customElements.define(`${prefix}-flex`, Flex);
customElements.define(`${prefix}-text`, Text);
customElements.define(`${prefix}-container`, Container);
customElements.define(`${prefix}-toggle`, Toggle);
customElements.define(`${prefix}-textarea`, TextArea);
customElements.define(`${prefix}-tabs`, Tabs);
customElements.define(`${prefix}-tab`, Tab);
customElements.define(`${prefix}-grid`, Grid);
customElements.define(`${prefix}-grid-item`, GridItem);
customElements.define(`${prefix}-select`, Select);
customElements.define(`${prefix}-option`, Option);
customElements.define(`${prefix}-optgroup`, OptGroup);
customElements.define(`${prefix}-menu`, Menu);
customElements.define(`${prefix}-menu-item`, MenuItem);
customElements.define(`${prefix}-range`, Range);
customElements.define(`${prefix}-overlay`, Overlay);
customElements.define(`${prefix}-slider`, Slider);
customElements.define(`${prefix}-slider-item`, SliderItem);
