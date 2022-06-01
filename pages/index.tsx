import { Button, ButtonVariant, Card, CardHeader, Drawer, DrawerActions, DrawerCloseButton, DrawerContent, DrawerContentBody, DrawerHead, DrawerPanelContent, DrawerSection, PageSection, Select, SelectOption, SelectVariant, Text, TextContent, TextInput, TextVariants, Toolbar, ToolbarContent, ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core'
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table'
import { AngleLeftIcon, AngleRightIcon } from '@patternfly/react-icons'
import { useMemo, useState } from 'react';
import Layout from '../components/Layout'

enum Weekday {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

const buildCalendar = (year: number, month: number) => {
  const defaultDate = new Date(year, month);
  const firstDayOfWeek = new Date(defaultDate);
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
  // We will always show 6 weeks like google calendar
  // Assume we just want the numbers for now...
  const calendarWeeks = [];
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      const date = new Date(firstDayOfWeek);
      const isActiveMonth = date.getMonth() === month;
      week.push({
        date,
        isActiveMonth
      });
      firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
    }
    calendarWeeks.push(week);
  }

  return calendarWeeks;
}

const monthFormat = date => date.toLocaleDateString(undefined, { month: 'long' });
const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(monthNum => new Date(1990, monthNum)).map(monthFormat);

const IndexPage = () => {

  const today = new Date()
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const calendar = useMemo(() => buildCalendar(selectedYear, selectedMonth), [selectedYear, selectedMonth]);

  const calendarToolbar = (
    <ToolbarContent>
      <ToolbarItem>
        <Button variant={ButtonVariant.plain}
          onClick={(event) => {
            if (selectedMonth === 0) {
              setSelectedYear(selectedYear - 1)
            }
            setSelectedMonth((selectedMonth + 11) % 12)
            event.currentTarget.blur()
          }}
        >
          <AngleLeftIcon />
        </Button>
      </ToolbarItem>
      <ToolbarItem widths={{ default: "140px" }}>
        <Select
          variant={SelectVariant.single}
          isOpen={isSelectOpen}
          onToggle={() => setIsSelectOpen(!isSelectOpen)}
          onSelect={(event, month) => {
            setIsSelectOpen(false);
            setSelectedMonth(Number(month as String));
          }}
          selections={months[selectedMonth]}
        >
          {months.map((month, index) => (
            <SelectOption key={index} value={index}>
              {month}
            </SelectOption>
          ))}
        </Select>
      </ToolbarItem>
      <ToolbarItem widths={{ default: "100px" }}>
        <TextInput
          type={"number"}
          value={selectedYear}
          onChange={year => setSelectedYear(+year)}
        />
      </ToolbarItem>
      <ToolbarItem>
        <Button variant={ButtonVariant.plain}
          onClick={(event) => {
            if (selectedMonth === 11) {
              setSelectedYear(selectedYear + 1)
            }
            setSelectedMonth((selectedMonth + 1) % 12)
            event.currentTarget.blur()
          }}
        >
          <AngleRightIcon />
        </Button>
      </ToolbarItem>
      <ToolbarItem>
        <Button variant={ButtonVariant.primary} isSmall
          onClick={(event) => {
            setSelectedMonth(today.getMonth())
            setSelectedYear(today.getFullYear())
            event.currentTarget.blur()
          }}
        >
          Today
        </Button>
      </ToolbarItem>
    </ToolbarContent>
  )

  const panelContent = (
    <DrawerPanelContent>
      <DrawerHead>
        <DrawerActions>
          <DrawerCloseButton onClose={() => setIsPanelExpanded(false)} />
        </DrawerActions>
      </DrawerHead>
    </DrawerPanelContent>
  )

  return (
    <Layout title="Birthday Box Booking">
      <PageSection>
        <TextContent>
          <Text component={TextVariants.h1}>Book the Birthday Box!</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <Drawer isExpanded={isPanelExpanded} isInline>
          <DrawerSection>
            <Toolbar usePageInsets>
              {calendarToolbar}
            </Toolbar>
          </DrawerSection>
          <DrawerContent panelContent={panelContent}>
            <DrawerContentBody>
              <TableComposable variant={"compact"} borders={false}>
                <Thead>
                  <Tr>
                    {[0, 1, 2, 3, 4, 5, 6].map(day =>
                      <Th width={10}>{Weekday[day]}</Th>
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                  {calendar.map((week, index) => (
                    <Tr key={index}>
                      {week.map(({ date, isActiveMonth }, index) => (
                        <Td key={index} dataLabel={Weekday[index]}>
                          <Card isPlain={!isActiveMonth} isSelectable onClick={() => setIsPanelExpanded(true)}>
                            <CardHeader>
                              {date.getDate()}
                            </CardHeader>
                          </Card>
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </TableComposable>
            </DrawerContentBody>
          </DrawerContent>
        </Drawer>
      </PageSection>
    </Layout>
  )
}

export default IndexPage