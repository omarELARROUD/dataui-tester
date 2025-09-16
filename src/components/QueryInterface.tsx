import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, Database, Users, GraduationCap, BookOpen } from 'lucide-react';
import { DataTable, TableColumn } from '@/components/DataTable';
import { RequestQueryBuilder } from '@/lib/query-builder';

interface QueryResult {
  id: string;
  type: string;
  data: any;
  timestamp: string;
}

const QueryInterface = () => {
  const [results, setResults] = useState<QueryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [studentsData, setStudentsData] = useState(mockStudentsData);
  const [classesData, setClassesData] = useState(mockClassesData);
  const [levelsData, setLevelsData] = useState(mockLevelsData);

  const handleQuery = async (queryType: string, queryData: any) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResult: QueryResult = {
        id: Date.now().toString(),
        type: queryType,
        data: queryData,
        timestamp: new Date().toLocaleString()
      };
      
      setResults(prev => [mockResult, ...prev]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-academic-light p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-academic-blue to-academic-navy rounded-xl">
              <Database className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-academic-blue to-academic-navy bg-clip-text text-transparent">
              DataUI Query Interface
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test and execute queries across classes, levels, and student data with our intuitive interface
          </p>
        </div>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="classes" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Classes
            </TabsTrigger>
            <TabsTrigger value="levels" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Levels
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <DataTable
              title="Students Data"
              description="Query and filter student records"
              columns={studentColumns}
              data={studentsData}
              loading={loading}
              onQuery={(queryString) => {
                console.log('Students Query:', queryString);
                handleQuery('students', { queryString });
              }}
              onRefresh={() => setStudentsData([...mockStudentsData])}
            />
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <DataTable
              title="Classes Data"
              description="Query and filter class records"
              columns={classColumns}
              data={classesData}
              loading={loading}
              onQuery={(queryString) => {
                console.log('Classes Query:', queryString);
                handleQuery('classes', { queryString });
              }}
              onRefresh={() => setClassesData([...mockClassesData])}
            />
          </TabsContent>

          <TabsContent value="levels" className="space-y-6">
            <DataTable
              title="Levels Data"
              description="Query and filter level records"
              columns={levelColumns}
              data={levelsData}
              loading={loading}
              onQuery={(queryString) => {
                console.log('Levels Query:', queryString);
                handleQuery('levels', { queryString });
              }}
              onRefresh={() => setLevelsData([...mockLevelsData])}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface FormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

const StudentQueryForm: React.FC<FormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    level: '',
    status: 'all'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="studentId">Student ID</Label>
          <Input
            id="studentId"
            placeholder="Enter student ID"
            value={formData.studentId}
            onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter student name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="level">Level</Label>
          <Input
            id="level"
            placeholder="Enter level"
            value={formData.level}
            onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="graduated">Graduated</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Executing Query...' : 'Query Students'}
      </Button>
    </form>
  );
};

const ClassQueryForm: React.FC<FormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    classId: '',
    className: '',
    instructor: '',
    semester: '',
    maxStudents: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="classId">Class ID</Label>
          <Input
            id="classId"
            placeholder="Enter class ID"
            value={formData.classId}
            onChange={(e) => setFormData(prev => ({ ...prev, classId: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="className">Class Name</Label>
          <Input
            id="className"
            placeholder="Enter class name"
            value={formData.className}
            onChange={(e) => setFormData(prev => ({ ...prev, className: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructor">Instructor</Label>
          <Input
            id="instructor"
            placeholder="Enter instructor name"
            value={formData.instructor}
            onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="semester">Semester</Label>
          <Input
            id="semester"
            placeholder="e.g., Fall 2024"
            value={formData.semester}
            onChange={(e) => setFormData(prev => ({ ...prev, semester: e.target.value }))}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="maxStudents">Max Students</Label>
        <Input
          id="maxStudents"
          type="number"
          placeholder="Enter max capacity"
          value={formData.maxStudents}
          onChange={(e) => setFormData(prev => ({ ...prev, maxStudents: e.target.value }))}
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Executing Query...' : 'Query Classes'}
      </Button>
    </form>
  );
};

const LevelQueryForm: React.FC<FormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    levelId: '',
    levelName: '',
    department: '',
    credits: '',
    prerequisites: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="levelId">Level ID</Label>
          <Input
            id="levelId"
            placeholder="Enter level ID"
            value={formData.levelId}
            onChange={(e) => setFormData(prev => ({ ...prev, levelId: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="levelName">Level Name</Label>
          <Input
            id="levelName"
            placeholder="Enter level name"
            value={formData.levelName}
            onChange={(e) => setFormData(prev => ({ ...prev, levelName: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            placeholder="Enter department"
            value={formData.department}
            onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="credits">Credits</Label>
          <Input
            id="credits"
            type="number"
            placeholder="Enter credits"
            value={formData.credits}
            onChange={(e) => setFormData(prev => ({ ...prev, credits: e.target.value }))}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="prerequisites">Prerequisites</Label>
        <Textarea
          id="prerequisites"
          placeholder="Enter prerequisites"
          value={formData.prerequisites}
          onChange={(e) => setFormData(prev => ({ ...prev, prerequisites: e.target.value }))}
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Executing Query...' : 'Query Levels'}
      </Button>
    </form>
  );
};

// Mock data
const mockStudentsData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', level: 'Undergraduate', status: 'active', gpa: 3.8, credits: 45 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', level: 'Graduate', status: 'active', gpa: 3.9, credits: 32 },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', level: 'Undergraduate', status: 'inactive', gpa: 3.2, credits: 78 },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', level: 'Graduate', status: 'active', gpa: 3.7, credits: 18 },
  { id: 5, name: 'Tom Brown', email: 'tom@example.com', level: 'Undergraduate', status: 'graduated', gpa: 3.6, credits: 120 },
];

const mockClassesData = [
  { id: 1, name: 'Computer Science 101', instructor: 'Dr. Smith', semester: 'Fall 2024', maxStudents: 30, enrolled: 25, credits: 3 },
  { id: 2, name: 'Mathematics 201', instructor: 'Prof. Johnson', semester: 'Fall 2024', maxStudents: 25, enrolled: 22, credits: 4 },
  { id: 3, name: 'Physics 301', instructor: 'Dr. Brown', semester: 'Spring 2024', maxStudents: 20, enrolled: 18, credits: 3 },
  { id: 4, name: 'Chemistry 101', instructor: 'Prof. Davis', semester: 'Fall 2024', maxStudents: 35, enrolled: 32, credits: 4 },
  { id: 5, name: 'Biology 201', instructor: 'Dr. Wilson', semester: 'Spring 2024', maxStudents: 28, enrolled: 26, credits: 3 },
];

const mockLevelsData = [
  { id: 1, name: 'Undergraduate', department: 'Engineering', credits: 120, prerequisites: 'High School Diploma', duration: '4 years' },
  { id: 2, name: 'Graduate', department: 'Computer Science', credits: 36, prerequisites: 'Bachelor Degree', duration: '2 years' },
  { id: 3, name: 'Doctorate', department: 'Physics', credits: 72, prerequisites: 'Master Degree', duration: '4-6 years' },
  { id: 4, name: 'Certificate', department: 'Business', credits: 18, prerequisites: 'None', duration: '1 year' },
  { id: 5, name: 'Associate', department: 'Liberal Arts', credits: 60, prerequisites: 'High School Diploma', duration: '2 years' },
];

// Table column definitions
const studentColumns: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true, filterable: true, type: 'number' },
  { key: 'name', label: 'Name', sortable: true, filterable: true, type: 'text' },
  { key: 'email', label: 'Email', sortable: true, filterable: true, type: 'text' },
  { key: 'level', label: 'Level', sortable: true, filterable: true, type: 'text' },
  { key: 'status', label: 'Status', sortable: true, filterable: true, type: 'status' },
  { key: 'gpa', label: 'GPA', sortable: true, filterable: false, type: 'number' },
  { key: 'credits', label: 'Credits', sortable: true, filterable: false, type: 'number' },
];

const classColumns: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true, filterable: true, type: 'number' },
  { key: 'name', label: 'Class Name', sortable: true, filterable: true, type: 'text' },
  { key: 'instructor', label: 'Instructor', sortable: true, filterable: true, type: 'text' },
  { key: 'semester', label: 'Semester', sortable: true, filterable: true, type: 'text' },
  { key: 'maxStudents', label: 'Max Students', sortable: true, filterable: false, type: 'number' },
  { key: 'enrolled', label: 'Enrolled', sortable: true, filterable: false, type: 'number' },
  { key: 'credits', label: 'Credits', sortable: true, filterable: false, type: 'number' },
];

const levelColumns: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true, filterable: true, type: 'number' },
  { key: 'name', label: 'Level Name', sortable: true, filterable: true, type: 'text' },
  { key: 'department', label: 'Department', sortable: true, filterable: true, type: 'text' },
  { key: 'credits', label: 'Credits', sortable: true, filterable: false, type: 'number' },
  { key: 'prerequisites', label: 'Prerequisites', sortable: false, filterable: true, type: 'text' },
  { key: 'duration', label: 'Duration', sortable: true, filterable: true, type: 'text' },
];

export default QueryInterface;