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

interface QueryResult {
  id: string;
  type: string;
  data: any;
  timestamp: string;
}

const QueryInterface = () => {
  const [results, setResults] = useState<QueryResult[]>([]);
  const [loading, setLoading] = useState(false);

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Query Panel */}
          <div className="lg:col-span-2">
            <Card className="shadow-academic border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-academic-blue" />
                  Query Builder
                </CardTitle>
                <CardDescription>
                  Build and execute queries for your educational data
                </CardDescription>
              </CardHeader>
              <CardContent>
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

                  <TabsContent value="students" className="space-y-4">
                    <StudentQueryForm onSubmit={(data) => handleQuery('students', data)} loading={loading} />
                  </TabsContent>

                  <TabsContent value="classes" className="space-y-4">
                    <ClassQueryForm onSubmit={(data) => handleQuery('classes', data)} loading={loading} />
                  </TabsContent>

                  <TabsContent value="levels" className="space-y-4">
                    <LevelQueryForm onSubmit={(data) => handleQuery('levels', data)} loading={loading} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div>
            <Card className="shadow-academic border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-academic-blue" />
                  Query Results
                </CardTitle>
                <CardDescription>
                  {results.length} {results.length === 1 ? 'result' : 'results'} found
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {results.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Database className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No queries executed yet</p>
                    <p className="text-sm">Run a query to see results here</p>
                  </div>
                ) : (
                  results.map((result) => (
                    <div key={result.id} className="p-4 bg-academic-light rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="capitalize">
                          {result.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {result.timestamp}
                        </span>
                      </div>
                      <div className="text-sm">
                        <pre className="whitespace-pre-wrap text-xs bg-muted p-2 rounded">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
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

export default QueryInterface;